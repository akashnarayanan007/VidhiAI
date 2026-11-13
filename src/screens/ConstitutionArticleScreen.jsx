import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { getLawById, getRelatedLaws } from '../services/lawService';
import { toggleBookmark, isBookmarked } from '../services/progressService';

export default function ConstitutionArticleScreen() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const law = getLawById(articleId);
  const relatedLaws = law ? getRelatedLaws(articleId) : [];
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('simple');

  useEffect(() => {
    if (law) {
      setBookmarked(isBookmarked(articleId));
    }
  }, [articleId, law]);

  if (!law) {
    return (
      <div className="screen">
        <div className="empty-state">
          <div className="empty-state-icon">📜</div>
          <div className="empty-state-title">Article not found</div>
          <Link to="/constitution" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Constitution Home</Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    toggleBookmark(articleId);
    setBookmarked(!bookmarked);
  };

  const extractPart = (tags) => {
    if (!tags) return '';
    const partTag = tags.find(t => t.startsWith('Part'));
    return partTag || '';
  };

  const tabs = [
    { id: 'simple', label: 'Simple Meaning' },
    { id: 'scope', label: 'Scope' },
    { id: 'cases', label: 'Cases' },
    { id: 'loopholes', label: 'Loopholes' },
    { id: 'upsc', label: 'UPSC Angle' },
  ];

  return (
    <div className="screen const-article-screen">
      {/* Header */}
      <div className="const-article-header">
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <button className={`bookmark-btn ${bookmarked ? 'active' : ''}`} onClick={handleBookmark}>
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Article Title Block */}
      <div className="const-article-hero">
        <div className="const-article-part">{extractPart(law.tags)}</div>
        <div className="const-article-number">Article {law.sectionNumber}</div>
        <h1 className="const-article-name">{law.title}</h1>
        {law.shortName && law.shortName !== law.title && (
          <div className="const-article-short">— {law.shortName} —</div>
        )}
      </div>

      {/* Divider */}
      <div className="const-article-divider" />

      {/* Text */}
      <div className="const-article-text">
        {law.definition?.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="const-article-divider" />

      {/* Tab Navigation */}
      <div className="const-article-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`const-article-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="const-article-tab-content">
        {activeTab === 'simple' && (
          <div className="const-article-section">
            <p className="const-section-body">{law.simplifiedExplanation}</p>
            {law.whoItAppliesTo && (
              <div className="const-info-card">
                <div className="const-info-label">👤 Applies to</div>
                <p>{law.whoItAppliesTo}</p>
              </div>
            )}
            {law.punishment && (
              <div className="const-info-card const-info-card-warn">
                <div className="const-info-label">⚖️ Consequences</div>
                <p>{law.punishment}</p>
              </div>
            )}
            {law.realWorldExample && (
              <div className="const-info-card const-info-card-example">
                <div className="const-info-label">📖 Example</div>
                <p>{law.realWorldExample}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'scope' && (
          <div className="const-article-section">
            <div className="const-info-card">
              <div className="const-info-label">📌 Scope & Applicability</div>
              <p style={{ whiteSpace: 'pre-line' }}>{law.simplifiedExplanation}</p>
            </div>
            <h4 className="const-sub-heading">Tags & Classification</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {law.tags?.map(t => <span key={t} className="const-chip">{t}</span>)}
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="const-article-section">
            {(!law.importantCases || law.importantCases.length === 0) ? (
              <div className="empty-state" style={{ padding: '2rem 0' }}>
                <div className="empty-state-icon">📂</div>
                <div className="empty-state-title" style={{ fontSize: 'var(--text-sm)' }}>No landmark cases documented</div>
              </div>
            ) : (
              law.importantCases.map((c, i) => (
                <div key={i} className="const-case-card">
                  <div className="const-case-name">{c.caseName}</div>
                  <div className="const-case-meta">{c.year} • {c.court}</div>
                  <p className="const-case-summary">{c.summary}</p>
                  <div className="const-case-significance">⭐ {c.significance}</div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'loopholes' && (
          <div className="const-article-section">
            {(!law.loopholes || law.loopholes.length === 0) ? (
              <div className="empty-state" style={{ padding: '2rem 0' }}>
                <div className="empty-state-icon">🔒</div>
                <div className="empty-state-title" style={{ fontSize: 'var(--text-sm)' }}>No loopholes documented</div>
              </div>
            ) : (
              law.loopholes.map((l, i) => (
                <div key={i} className="const-loophole-card">
                  <div className="const-loophole-name">{l.loopholeName}</div>
                  <p className="const-loophole-desc">{l.description}</p>
                  <div className="const-loophole-use">
                    <span>🚨 How used:</span> {l.howPeopleUseIt}
                  </div>
                  <div className="const-loophole-fix">
                    <span>✅ Fix:</span> {l.howToOvercome}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'upsc' && (
          <div className="const-article-section">
            {law.upscTopics && law.upscTopics.length > 0 && (
              <div className="const-upsc-topics">
                <h4 className="const-sub-heading">📚 UPSC Topics</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {law.upscTopics.map(t => <span key={t} className="const-chip const-chip-upsc">{t}</span>)}
                </div>
              </div>
            )}
            {law.aiSearchKeywords && law.aiSearchKeywords.length > 0 && (
              <div className="const-upsc-topics" style={{ marginTop: 16 }}>
                <h4 className="const-sub-heading">🔍 Related Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {law.aiSearchKeywords.map(k => <span key={k} className="const-chip">{k}</span>)}
                </div>
              </div>
            )}
            {law.scenarioTags && law.scenarioTags.length > 0 && (
              <div className="const-upsc-topics" style={{ marginTop: 16 }}>
                <h4 className="const-sub-heading">🏛️ Scenario Tags</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {law.scenarioTags.map(s => <span key={s} className="const-chip">{s}</span>)}
                </div>
              </div>
            )}
            {(law.upscTopics?.length === 0 && law.aiSearchKeywords?.length === 0) && (
              <div className="empty-state" style={{ padding: '2rem 0' }}>
                <div className="empty-state-icon">📝</div>
                <div className="empty-state-title" style={{ fontSize: 'var(--text-sm)' }}>No UPSC-specific data for this article</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Articles */}
      {relatedLaws.length > 0 && (
        <div className="const-related-section">
          <h4 className="const-sub-heading">🔗 Related Articles</h4>
          <div className="const-related-list">
            {relatedLaws.map(rl => (
              <Link key={rl.id} to={`/law/${rl.id}`} className="const-related-item">
                <div>
                  <span className="const-related-section">Article {rl.sectionNumber}</span>
                  <span className="const-related-title">{rl.title}</span>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary)" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Constitution */}
      <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 16 }}>
        <Link to="/constitution" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Constitution</span>
        </Link>
      </div>
    </div>
  );
}
