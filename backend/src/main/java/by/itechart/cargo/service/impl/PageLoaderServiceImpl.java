package by.itechart.cargo.service.impl;

import by.itechart.cargo.microservices.pdf_loading.connector.PublisherToPDFLoadingMicroservice;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.PageLoaderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PageLoaderServiceImpl implements PageLoaderService {
    private final PublisherToPDFLoadingMicroservice publisherToPDFLoadingMicroservice;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public PageLoaderServiceImpl(PublisherToPDFLoadingMicroservice microserviceConnector, JwtTokenUtil jwtTokenUtil) {
        this.publisherToPDFLoadingMicroservice = microserviceConnector;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void savePage(String url) {
        publisherToPDFLoadingMicroservice.publish(jwtTokenUtil.getJwtUser().getId(), url);
    }
}
