from scrapling.fetchers import StealthySession

class PageScrap:
  def get_page(self, url: str):
    with StealthySession(headless=True, solve_cloudflare=True) as session:
      page = session.fetch(url)
      with open("./data.html", "w") as file:
        print("============WRITING TO A FILE===============")
        file.write(page.text)
      return page
