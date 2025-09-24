package com.jobhunter.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.enums.ContractType;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.model.Website;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class LogFileHandlerService {

  @PersistenceContext
  private EntityManager em;

  CityService cityService;
  WebsiteService websiteService;
  CandidService candidService;
  TechService techService;

  public LogFileHandlerService(EntityManager em, CityService cityService, WebsiteService websiteService,
      CandidService candidService, TechService techService) {
    this.em = em;
    this.cityService = cityService;
    this.websiteService = websiteService;
    this.candidService = candidService;
    this.techService = techService;
  }

  String fd = "static/log.txt";
  ArrayList<Integer> indexes = new ArrayList<Integer>();
  ArrayList<String> lines = new ArrayList<String>();
  ArrayList<Candid> candids = new ArrayList<Candid>();
  ArrayList<String> stackLines = new ArrayList<String>();

  public void handleFile() {
    makeIndexesAndLines();
    extractCandid();
  }

  public void handleCandidStack() {
    List<Tech> techs = techService.findAllEntities();
    for (Tech tech : techs) {
      for (Candid candid : tech.getCandids()) {
        candid.addTech(tech);
        candidService.save(candid);
      }
    }

  }

  public void openFile() {
    int n = 0;
    try (InputStream reader = new ClassPathResource(fd).getInputStream()) {
      while ((char) (n = reader.read()) != '\n') {
        System.out.print((char) n);
      }
    } catch (IOException e) {
      System.out.println("problem reading file");
      System.out.println(e);
    }

  }

  private void makeIndexesAndLines() {
    try (InputStream reader = new ClassPathResource(fd).getInputStream()) {
      int lenfirstline = firstLineLen();
      indexes.add(0);
      String line = new String("");

      int n, m = -1, l = 0, k = 0;

      while ((n = reader.read()) != -1) {
        char c = (char) n;

        if (c != '\n') {
          line += c;
        } else {
          lines.add(line);
          l++;
          line = "";
        }

        if (c != '\n' && l == 0 && m != -1 && (char) m == ' ' && c != ' ') {
          indexes.add(k);
        }

        k++;
        m = n;
      }

      indexes.add(lenfirstline - 1);
      lines.remove(0);
    } catch (IOException e) {
      System.out.println("problem reading file");
    }
  }

  private ContractType resolveContractType(String ct) {
    if (ct.contains("cdi"))
      return ContractType.CDI;
    else if (ct.contains("cdd"))
      return ContractType.CDD;
    else if (ct.contains("alter"))
      return ContractType.ALTERNANCE;
    else if (ct.contains("stag"))
      return ContractType.STAGE;
    return ContractType.NONSPECIFIE;
  }

  private Boolean resolveAnswer(String answer) {
    if (answer.contains("no") || answer.contains("/"))
      return false;
    return true;
  }

  private Boolean resolveUnsolicited(String s) {
    return s.contains("no") ? false : true;
  }

  private LocalDate resolveDate(String s) {
    String formatString = "dd/MM/yyyy";
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString);
    return LocalDate.parse(s, formatter);
  }

  private void handleLine(String line) {
    Candid candid = new Candid();

    String company = removeSpace(line, indexes.get(0), indexes.get(1));
    String title = removeSpace(line, indexes.get(2), indexes.get(3)); // position
    String contract = removeSpace(line, indexes.get(3), indexes.get(4));
    String answer = line.substring(indexes.get(7), indexes.get(8));
    String s = removeSpace(line, indexes.get(5), indexes.get(6));
    String dateString = removeSpace(line, indexes.get(6), indexes.get(7));

    String unsolicited = removeSpace(line, indexes.get(4), indexes.get(5));

    String cityName = removeSpace(line, indexes.get(1), indexes.get(2));
    City city = cityService.findOrCreateByName(cityName);

    String websiteName = removeSpace(line, indexes.get(8), line.length());
    Website website = websiteService.findOrCreateByName(websiteName);

    candid.setTitle(title);
    candid.setCity(city);
    candid.setWebsite(website);
    candid.setCompany(company);
    candid.setContractType(resolveContractType(contract));
    candid.setAnswer(resolveAnswer(answer));
    candid.setAddDate(resolveDate(dateString));
    candid.setUnsolicited(resolveUnsolicited(unsolicited));
    candid.setUrl("");

    candidService.save(candid);

    if (s.equals("/")) {
      stackLines.add("non specified");
      Tech tech = techService.findOrCreateByName("unspecified");
      tech.addCandid(candid);
      techService.save(tech);
      candid.addTech(tech);
    } else {
      String[] stackSplit = s.split(",");
      for (String stack : stackSplit) {
        Tech tech = techService.findOrCreateByName(stack);
        tech.addCandid(candid);
        techService.save(tech);
        candid.addTech(tech);
      }
    }

    candidService.save(candid);
  }

  private void extractCandid() {
    try (InputStream reader = new ClassPathResource(fd).getInputStream()) {
      lines.forEach(line -> handleLine(line));
    } catch (IOException e) {
      System.out.println("problem reading file");
    }
  }

  private String removeSpace(String s, int a, int b) {
    return s.substring(a, b).replaceAll("\\s+", "");
  }

  private int firstLineLen() {
    int l = 0, n;
    try (InputStream reader = new ClassPathResource(fd).getInputStream()) {
      while ((n = reader.read()) != -1) {
        l++;
        if ((char) n == '\n')
          break;
      }
    } catch (IOException e) {
      System.out.println("problem reading file");
    }
    return l;

  }
}
