from scrapling.fetchers import StealthySession

class PageScrap:
  def get_page(self, url: str):
    with StealthySession(headless=True, solve_cloudflare=True, geoip=True) as session:
      page = session.fetch(url)
      return page
