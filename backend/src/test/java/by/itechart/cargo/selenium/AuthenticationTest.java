package by.itechart.cargo.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class AuthenticationTest {

    private static WebDriver driver;

    @BeforeAll
    static void setup() {

        log.info("Connecting to driver...");

        WebDriverManager.chromedriver().setup();

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http:/localhost:3000");

    }

    @DisplayName("Login in the system")
    @Test
    void loginTest() {

        /* Click to login button */

        WebElement signInBtn = getButtonInHeaderByText("SIGN IN");
        assertNotNull(signInBtn);
        signInBtn.click();

        /* Sign in the system */

        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement submit = driver.findElement(By.className("login-form"))
                .findElement(By.tagName("button"));

        assertNotNull(email);
        assertNotNull(password);
        assertNotNull(submit);

        email.sendKeys("admin@gmail.com");
        password.sendKeys("root");
        submit.click();

        /* Asserts */

        try {
            Thread.sleep(1000);
            assertNotNull(getButtonInHeaderByText("SIGN OUT"));
            assertTrue(driver.getCurrentUrl().endsWith("/main"));
            assertFalse(driver.findElement(By.className("link-item-white")).getText().equalsIgnoreCase("CARGO APP"));

        } catch (InterruptedException e) {
            log.error("Test failed while sleep", e);
        }


    }

    @DisplayName("Logout from the system")
    @Test
    void logoutTest() {

        WebElement signOutBtn = getButtonInHeaderByText("SIGN OUT");
        assertNotNull(signOutBtn);
        signOutBtn.click();

        ExpectedCondition<Boolean> pageLoadCondition = driver ->
                ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");

        WebDriverWait wait = new WebDriverWait(driver, 30);
        wait.until(pageLoadCondition);

        assertNotNull(getButtonInHeaderByText("SIGN IN"));
        assertTrue(driver.findElement(By.tagName("header")).findElement(By.tagName("h6")).getText().equalsIgnoreCase("CARGO APP"));


    }

    private WebElement getButtonInHeaderByText(String text) {
        List<WebElement> buttons = driver
                .findElement(By.tagName("header"))
                .findElements(By.tagName("button"))
                .stream()
                .filter(e -> e.getText().equalsIgnoreCase(text))
                .collect(Collectors.toList());
        return buttons.isEmpty() ? null : buttons.get(0);
    }


    @AfterAll
    static void destroy() {
        driver.quit();
        log.info("Driver closed.");
    }

}
