package by.itechart.cargo.api;

import by.itechart.cargo.dto.model_dto.user.PhoneRequest;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.user.UserUpdateRequest;
import by.itechart.cargo.model.User;
import by.itechart.cargo.service.MockEntityFactory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.Charset;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("admin@gmail.com")
@TestPropertySource("/application-test.properties")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserLayerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @SneakyThrows
    @DisplayName("PUT /v1/api/users - should change name to \"NameMock\"")
    @Test
    @Order(1)
    void should_updateUserName() {

        User mockUser = MockEntityFactory.getMockUser();
        UserUpdateRequest userUpdateRequest = UserUpdateRequest.fromUser(mockUser);
        userUpdateRequest.setId(4L);

        String jsonRequest = objectMapper.writeValueAsString(userUpdateRequest);

        mockMvc.perform(put("/v1/api/users")
                .contentType(new MediaType(MediaType.APPLICATION_JSON.getType() , MediaType.APPLICATION_JSON.getSubtype() , Charset.forName("utf8")))
                .content(jsonRequest))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @SneakyThrows
    @DisplayName("PUT /v1/api/users/phone - should change phone to \"111222333\"")
    @Test
    @Order(2)
    void should_updateUserPhone() {

        PhoneRequest phoneRequest = new PhoneRequest("111222333");

        String jsonRequest = objectMapper.writeValueAsString(phoneRequest);

        mockMvc.perform(put("/v1/api/users/phone")
                .contentType(new MediaType(MediaType.APPLICATION_JSON.getType() , MediaType.APPLICATION_JSON.getSubtype() , Charset.forName("utf8")))
                .content(jsonRequest))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @SneakyThrows
    @DisplayName("GET /v1/api/users/info - should return user with email \"admin@gmail.com\", name \"NameMock\", phone \"111222333\"")
    @Test
    @Order(3)
    @Sql(value = {"/sql/user-update-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void should_returnUpdatedUserAdmin() {

        User mockUser = MockEntityFactory.getMockUser();

        mockMvc.perform(get("/v1/api/users/info"))
                .andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.email").value("admin@gmail.com"))
                .andExpect(jsonPath("$.user.name").value(mockUser.getName()))
                .andExpect(jsonPath("$.user.phone").value("111222333"))
                .andExpect(jsonPath("$.company.id").value("2"));

    }


    @SneakyThrows
    @DisplayName("GET /v1/api/users - should return variable users")
    @Test
    @Order(4)
    void should_returnUsers() {

        MvcResult mvcResult = mockMvc.perform(get("/v1/api/users"))
                .andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isNotEmpty())
                .andReturn();


        List<UserResponse> userResponses = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {
        });
        List<String> emails = userResponses.stream().map(UserResponse::getEmail).collect(Collectors.toList());

        assertTrue(emails.contains("dispatcher@gmail.com"));
        assertTrue(emails.contains("admin@gmail.com"));
        assertTrue(emails.contains("manager@gmail.com"));

    }

}
