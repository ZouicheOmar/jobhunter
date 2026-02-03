package com.jobhunter.backend.controller;

import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.mapper.WebsiteMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.mockito.BDDMockito;

@WebMvcTest(WebsiteController.class)
class WebsiteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private WebsiteController controller;

    @Test
    void getWebsite_ReturnWebsite_WhenFound() throws Exception {
        String name = "hellowork";
        Website website = new Website(1, name);
        WebsiteDto dto = WebsiteMapper.toDto(website);
        BDDMockito.when(controller.findById(1)).thenReturn(ResponseEntity.ok(dto));

        mockMvc.perform(MockMvcRequestBuilders.get("/website/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(name));
    }
}
