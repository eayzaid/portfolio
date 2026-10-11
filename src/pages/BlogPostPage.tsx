import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { PixelIcon } from '../components/PixelIcon';
import { NantesTimeBox } from '../components/NantesTimeBox';
import { formatEmphasizedText } from '../utils/formatText';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = postIndex !== -1 ? blogPosts[postIndex] : null;

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div
        className="fp-panel fp-gridpaper fp-empty"
        style={{
          marginTop: '32px',
          padding: '48px 24px',
          backgroundColor: 'var(--fp-surface)',
        }}
      >
        <PixelIcon name="terminal" size={32} />
        <h2 style={{ margin: '12px 0 6px 0' }}>Article Not Found</h2>
        <p style={{ color: 'var(--fp-muted)', fontSize: '14px', maxWidth: '420px' }}>
          The requested dispatch slug <code>"{slug}"</code> does not exist in the archives.
        </p>
        <button
          type="button"
          className="fp-btn fp-btn--primary"
          onClick={() => navigate('/blog')}
          style={{ marginTop: '12px' }}
        >
          Return to Blog Archive
        </button>
      </div>
    );
  }

  return (
    <article style={{ marginTop: '24px' }}>
      {/* 1. Breadcrumbs & Back Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <Link
          to="/blog"
          className="fp-btn fp-btn--sm"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--fp-font-mono, monospace)',
          }}
        >
          <span>←</span>
          <span>Back to Articles</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="fp-btn fp-btn--sm"
            onClick={handleCopyLink}
            title="Copy URL"
            style={{ fontFamily: 'var(--fp-font-mono, monospace)', fontSize: '11px' }}
          >
            {copied ? '✓ URL COPIED' : '⎘ SHARE POST'}
          </button>
          <NantesTimeBox />
        </div>
      </div>

      {/* 2. Article Header Panel */}
      <section
        className="fp-panel fp-gridpaper"
        style={{
          padding: '32px',
          backgroundColor: 'var(--fp-surface)',
          position: 'relative',
          marginBottom: '28px',
        }}
      >
        {/* Meta Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          <span
            className="fp-badge fp-badge--ok"
            style={{ fontSize: '11px', padding: '3px 8px' }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: 'var(--fp-font-mono, monospace)',
              fontSize: '12px',
              color: 'var(--fp-muted)',
            }}
          >
            {post.date} • {post.readTime}
          </span>
        </div>

        {/* Article Title */}
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
          }}
        >
          {post.title}
        </h1>

        {/* Lead Excerpt */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--fp-text)',
            opacity: 0.9,
            marginBottom: '20px',
            maxWidth: '780px',
          }}
        >
          {post.excerpt}
        </p>

        {/* Author Line & Tags */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--fp-hair)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--fp-primary)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--fp-font-mono, monospace)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              By Zaidane Ayman (ENSAM Meknès & Centrale Nantes)
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--fp-font-mono, monospace)',
                  color: 'var(--fp-muted)',
                  backgroundColor: 'var(--fp-surface-2)',
                  padding: '2px 8px',
                  border: '1px solid var(--fp-hair)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Takeaways Box */}
      {post.takeaways && post.takeaways.length > 0 && (
        <div
          className="fp-panel"
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--fp-surface-2)',
            borderLeft: '6px solid var(--fp-primary)',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--fp-font-mono, monospace)',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: 'var(--fp-primary)',
              marginBottom: '10px',
            }}
          >
            [ CORE TAKEAWAYS // EXECUTIVE SUMMARY ]
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--fp-text)',
            }}
          >
            {post.takeaways.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Main Body Content */}
      <section
        className="fp-panel fp-gridpaper"
        style={{
          padding: '36px',
          backgroundColor: 'var(--fp-surface)',
          lineHeight: 1.75,
          fontSize: '15px',
          marginBottom: '32px',
        }}
      >
        {post.content.map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            const heading = paragraph.replace('### ', '');
            return (
              <h2
                key={index}
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginTop: '32px',
                  marginBottom: '12px',
                  color: 'var(--fp-text)',
                  borderBottom: '2px solid var(--fp-hair)',
                  paddingBottom: '6px',
                }}
              >
                {heading}
              </h2>
            );
          }
          return (
            <p key={index} style={{ marginBottom: '16px', color: 'var(--fp-text)' }}>
              {formatEmphasizedText(paragraph)}
            </p>
          );
        })}
      </section>

      {/* 5. Pagination / Prev Next Article */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {prevPost ? (
          <Link
            to={`/blog/${prevPost.slug}`}
            className="fp-panel"
            style={{
              padding: '16px',
              backgroundColor: 'var(--fp-surface)',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--fp-font-mono, monospace)',
                fontSize: '11px',
                color: 'var(--fp-muted)',
              }}
            >
              ← PREVIOUS ARTICLE
            </span>
            <span style={{ fontWeight: 700, fontSize: '13px' }}>{prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost && (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="fp-panel"
            style={{
              padding: '16px',
              backgroundColor: 'var(--fp-surface)',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textAlign: 'right',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--fp-font-mono, monospace)',
                fontSize: '11px',
                color: 'var(--fp-muted)',
              }}
            >
              NEXT ARTICLE →
            </span>
            <span style={{ fontWeight: 700, fontSize: '13px' }}>{nextPost.title}</span>
          </Link>
        )}
      </div>

      {/* 6. Return to Top & Archive Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          alignItems: 'center',
          margin: '24px 0 36px 0',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/blog" className="fp-btn">
          <span>← Back to All Articles</span>
        </Link>

        <button
          type="button"
          className="fp-btn fp-btn--primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--fp-font-mono, monospace)',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PixelIcon name="arrowUp" size={16} />
          <span>Scroll To Top</span>
          <span style={{ fontSize: '11px' }}>[ ▲ ]</span>
        </button>
      </div>
    </article>
  );
}
