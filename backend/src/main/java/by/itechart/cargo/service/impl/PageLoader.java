package by.itechart.cargo.service.impl;

import by.itechart.cargo.microservices.pdf_loading.PDFLoadingMicroserviceConnector;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.PageLoaderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PageLoader implements PageLoaderService {
    private final PDFLoadingMicroserviceConnector microserviceConnector;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public PageLoader(PDFLoadingMicroserviceConnector microserviceConnector, JwtTokenUtil jwtTokenUtil) {
        this.microserviceConnector = microserviceConnector;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void savePage(String url) {
        microserviceConnector.publish(jwtTokenUtil.getJwtUser().getId(), url);
    }
}
