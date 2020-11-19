package by.itechart.cargo.controller;


import by.itechart.cargo.service.impl.PageLoader;
import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/loader")
public class PageLoadingController {
    PageLoader pageLoader;

    @Autowired
    public PageLoadingController(PageLoader pageLoader) {
        this.pageLoader = pageLoader;
    }

    @GetMapping("/page")
    public ResponseEntity<String> downloadPage(@RequestParam String url) {
        pageLoader.savePage(url);
        return ResponseEntity.ok("In process");
    }
}
