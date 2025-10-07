from scrapper import Scrapper


def main():
  url = "https://www.hellowork.com/fr-fr/emplois/69214003.html"
  firecrawl_scrapper = Scrapper()
  response = firecrawl_scrapper.scrap(url)
  # print(response)


if __name__ == "__main__":
  main()
