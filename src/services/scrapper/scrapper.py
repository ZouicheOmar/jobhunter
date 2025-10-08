from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import FireCrawlLoader
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain_text_splitters import RecursiveCharacterTextSplitter

from firecrawl import FirecrawlApp

from pydantic import BaseModel, Field
from typing import List, Optional, Type

from models import JobOfferData
from utils import write_to_file


class Scrapper:
  def __init__(
    self,
    schema: Optional[Type[BaseModel]] = JobOfferData,
    model: str = "llama3.2",
    embedding_model: str = "nomic-embed-text",
    question: str = "extract job offer information from the following document",
  ):
    self.question = question
    self.embeddings = OllamaEmbeddings(model=embedding_model)
    self.llm = ChatOllama(model=model).with_structured_output(
      schema, method="json_schema"
    )
    self.splitter = RecursiveCharacterTextSplitter(
      chunk_size=1200, chunk_overlap=100, add_start_index=True
    )

  def _handle_url(self, url: str):
    # loader = FireCrawlLoader(
    #   url=url,
    #   api_url="http://localhost:3002/",
    #   api_key="someapikey",
    #   mode="scrape",
    #   params={
    #     "formats": ["markdown"],
    #   },
    # )

    firecrawl = FirecrawlApp(
      api_url="http://localhost:3002/",
      api_key="someapikey",
    )

    doc = firecrawl.scrape_url(
      url=url,
      # formats=[{"type": "json", "schema": JobOfferData}],
    )

    # print("=====DOC MD=========")
    # print(doc)
    # print(doc.json)
    # print("====================")

    self.context = doc

    # splits = self.splitter.split_documents(docs)
    # self.context = splits

  def _prompt(self):
    return f"""Answer the question according to the context given:
              Question: {self.question}.
              Context: {self.context}
    """

  def scrap(self, url: str):
    self._handle_url(url)
    response = self.llm.invoke(self._prompt())
    return response
