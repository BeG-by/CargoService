package by.itechart.cargo.config;

import by.itechart.cargo.microservices.pdf_loading.AmazonLambdaService;
import by.itechart.cargo.microservices.pdf_loading.PDFLoadingMicroservice;
import by.itechart.cargo.microservices.pdf_loading.PDFLoadingMicroserviceConnector;
import by.itechart.cargo.microservices.pdf_loading.PDFResponseMessagePublisher;
import liquibase.pro.packaged.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
public class RedisConfig {
    private final static String TOPIC_FOR_PDF_LOADING_REQUEST = "pubsub:pdf-loading-req";
    private final static String TOPIC_FOR_PDF_LOADING_RESPONSE = "pubsub:pdf-loading-resp";

    PDFLoadingMicroservice pdfLoadingMicroservice;

    @Autowired
    public RedisConfig(PDFLoadingMicroservice pdfLoadingMicroservice) {
        this.pdfLoadingMicroservice = pdfLoadingMicroservice;
    }

    @Bean
    public LettuceConnectionFactory lettuceConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(lettuceConnectionFactory());
        return template;
    }

    @Bean
    RedisMessageListenerContainer redisMessageListenerContainer() {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(lettuceConnectionFactory());

        container.addMessageListener(new MessageListenerAdapter(pdfLoadingMicroservice), topicForPdfLoadingRequest());
        container.addMessageListener(new MessageListenerAdapter(pdfLoadingMicroserviceConnector()), topicForPdfLoadingResponse());
        return container;
    }


    @Bean
    PDFLoadingMicroserviceConnector pdfLoadingMicroserviceConnector() {
        PDFLoadingMicroserviceConnector microserviceConnector = new PDFLoadingMicroserviceConnector();
        microserviceConnector.setRedisTemplate(redisTemplate());
        microserviceConnector.setTopicForPDFLoadingRequests(topicForPdfLoadingRequest());
        return microserviceConnector;
    }

    @Bean
    ChannelTopic topicForPdfLoadingRequest() {
        return new ChannelTopic(TOPIC_FOR_PDF_LOADING_REQUEST);
    }

    @Bean
    ChannelTopic topicForPdfLoadingResponse() {
        return new ChannelTopic(TOPIC_FOR_PDF_LOADING_RESPONSE);
    }
}
