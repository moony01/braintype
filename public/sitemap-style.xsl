<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Brain Type Test - Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #eef2ff 0%, #e0f2fe 50%, #f0e7ff 100%);
            color: #1e293b;
            min-height: 100vh;
            padding: 2rem;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
          }

          /* 헤더 카드 */
          header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2.5rem 2rem;
            background: white;
            border-radius: 24px;
            box-shadow: 0 4px 24px rgba(99, 102, 241, 0.1);
            border-top: 5px solid;
            border-image: linear-gradient(90deg, #6366f1, #06b6d4) 1;
          }
          .emoji {
            font-size: 3rem;
            margin-bottom: 0.5rem;
          }
          h1 {
            font-size: 1.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.25rem;
          }
          .subtitle {
            color: #64748b;
            font-size: 0.875rem;
          }

          /* 통계 */
          .stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 1.5rem;
          }
          .stat {
            text-align: center;
          }
          .stat-value {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .stat-label {
            font-size: 0.7rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 600;
          }

          /* 테이블 */
          .table-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(99, 102, 241, 0.08);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background: linear-gradient(135deg, #6366f1, #7c3aed);
            padding: 0.875rem 1.25rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: white;
          }
          td {
            padding: 0.75rem 1.25rem;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.85rem;
            color: #475569;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover {
            background: #f8fafc;
          }
          a {
            color: #6366f1;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          a:hover {
            color: #4f46e5;
            text-decoration: underline;
          }

          /* 우선순위 배지 */
          .priority {
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
            font-size: 0.7rem;
            font-weight: 700;
          }
          .priority-high {
            background: linear-gradient(135deg, #dcfce7, #d1fae5);
            color: #166534;
          }
          .priority-medium {
            background: linear-gradient(135deg, #fef9c3, #fef3c7);
            color: #854d0e;
          }
          .priority-low {
            background: #f1f5f9;
            color: #64748b;
          }

          /* 언어 태그 */
          .lang-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
          }
          .lang-tag {
            display: inline-block;
            padding: 0.15rem 0.45rem;
            background: linear-gradient(135deg, #eef2ff, #e0e7ff);
            border-radius: 6px;
            font-size: 0.6rem;
            color: #6366f1;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.03em;
          }

          /* 푸터 */
          footer {
            text-align: center;
            margin-top: 2rem;
            padding: 1rem;
            color: #94a3b8;
            font-size: 0.75rem;
          }
          footer a {
            color: #6366f1;
          }

          /* 반응형 */
          @media (max-width: 640px) {
            body { padding: 1rem; }
            header { padding: 1.5rem 1rem; }
            .stats { gap: 1.5rem; }
            .stat-value { font-size: 1.5rem; }
            th, td { padding: 0.5rem 0.75rem; }
            td { font-size: 0.75rem; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="emoji">🧠</div>
            <h1>Brain Type Test</h1>
            <p class="subtitle">Sitemap - Search Engine Optimization</p>
            <div class="stats">
              <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                <div class="stat-label">Total URLs</div>
              </div>
              <div class="stat">
                <div class="stat-value">11</div>
                <div class="stat-label">Languages</div>
              </div>
            </div>
          </header>

          <div class="table-card">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%">URL</th>
                  <th>Priority</th>
                  <th>Frequency</th>
                  <th>Languages</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.8">
                          <span class="priority priority-high"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.5">
                          <span class="priority priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority priority-low"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td><xsl:value-of select="sitemap:changefreq"/></td>
                    <td>
                      <div class="lang-tags">
                        <xsl:for-each select="xhtml:link[@rel='alternate']">
                          <span class="lang-tag"><xsl:value-of select="@hreflang"/></span>
                        </xsl:for-each>
                      </div>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            <p>Brain Type Test | <a href="https://moony01.github.io/braintype/">moony01.github.io/braintype</a></p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
