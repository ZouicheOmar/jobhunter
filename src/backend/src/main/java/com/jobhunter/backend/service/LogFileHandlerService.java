package com.jobhunter.backend.service;

import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.hibernate.type.descriptor.java.LocalDateTimeJavaType;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.enums.ContractType;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.repository.CityRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

@Service
public class LogFileHandlerService {

  @PersistenceContext
  private EntityManager em;
  CityService cityService;
  WebsiteService websiteService;
  CandidService candidService;

  public LogFileHandlerService(EntityManager em, CityService cityService, WebsiteService websiteService,
      CandidService candidService) {
    this.em = em;
    this.cityService = cityService;
    this.websiteService = websiteService;
    this.candidService = candidService;
  }

  String fd = "static/log.txt";
  ArrayList<Integer> indexes = new ArrayList<Integer>();
  ArrayList<String> lines = new ArrayList<String>();
  ArrayList<Candid> candids = new ArrayList<Candid>();

  public void handleFile() {
    makeIndexesAndLines();
    extractCandid();
    candidService.saveAll(candids);
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

  private String[] resolveStack(String stackString) {
    String nostack = "/";
    String[] res = { "" };

    if (!stackString.equals(nostack)) {
      return stackString.split(",");
    }

    return res;
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
    Candid c = new Candid();

    String company = removeSpace(line, indexes.get(0), indexes.get(1));
    String title = removeSpace(line, indexes.get(2), indexes.get(3)); // position
    String contract = removeSpace(line, indexes.get(3), indexes.get(4));
    String answer = line.substring(indexes.get(7), indexes.get(8));
    String stackString = removeSpace(line, indexes.get(5), indexes.get(6));
    String dateString = removeSpace(line, indexes.get(6), indexes.get(7));

    String unsolicited = removeSpace(line, indexes.get(4), indexes.get(5));

    String cityName = removeSpace(line, indexes.get(1), indexes.get(2));
    City city = cityService.findOrCreateByName(cityName);

    String websiteName = removeSpace(line, indexes.get(8), line.length());
    Website website = websiteService.findOrCreateByName(websiteName);

    c.setTitle(title);
    c.setCity(city);
    c.setWebsite(website);
    c.setCompany(company);
    c.setContractType(resolveContractType(contract));
    c.setAnswer(resolveAnswer(answer));
    c.setStack(resolveStack(stackString));
    c.setAddDate(resolveDate(dateString));
    c.setUnsolicited(resolveUnsolicited(unsolicited));
    c.setUrl("");

    candids.add(c);
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
