package by.itechart.cargo.config;

import by.itechart.cargo.microservices.pdf_loading.connector.PDFLoadingResponseListener;
import by.itechart.cargo.microservices.pdf_loading.connector.PublisherToPDFLoadingMicroservice;
import by.itechart.cargo.microservices.pdf_loading.service.PDFLoadingMicroservice;
import by.itechart.cargo.microservices.message_broker.MailListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
public class RedisConfig {
    private final static String TOPIC_FOR_PDF_LOADING_REQUEST = "pubsub:pdf-loading-req";
    private final static String TOPIC_FOR_PDF_LOADING_RESPONSE = "pubsub:pdf-loading-resp";
    private final static String TOPIC_EMAIL = "cargo-email";


    private final PDFLoadingMicroservice pdfLoadingMicroservice;
    private final PDFLoadingResponseListener pdfLoadingResponseListener;
    private final MailListener mailListener;


    @Autowired
    public RedisConfig(PDFLoadingMicroservice pdfLoadingMicroservice,
                       @Lazy PDFLoadingResponseListener pdfLoadingResponseListener,
                       MailListener mailListener) {
        this.pdfLoadingMicroservice = pdfLoadingMicroservice;
        this.pdfLoadingResponseListener = pdfLoadingResponseListener;
        this.mailListener = mailListener;
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
    public RedisMessageListenerContainer redisMessageListenerContainer() {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(lettuceConnectionFactory());

        container.addMessageListener(new MessageListenerAdapter(pdfLoadingMicroservice), topicForPdfLoadingRequest());
        container.addMessageListener(new MessageListenerAdapter(pdfLoadingResponseListener), topicForPdfLoadingResponse());
        container.addMessageListener(new MessageListenerAdapter(mailListener), topicForEmail());
        return container;
    }

    @Bean
    public PublisherToPDFLoadingMicroservice publisherToPDFLoadingMicroservice() {
        return new PublisherToPDFLoadingMicroservice(topicForPdfLoadingRequest(), redisTemplate());
    }

    @Bean
    public ChannelTopic topicForPdfLoadingRequest() {
        return new ChannelTopic(TOPIC_FOR_PDF_LOADING_REQUEST);
    }

    @Bean
    public ChannelTopic topicForPdfLoadingResponse() {
        return new ChannelTopic(TOPIC_FOR_PDF_LOADING_RESPONSE);
    }

    @Bean
    public ChannelTopic topicForEmail() {
        return new ChannelTopic(TOPIC_EMAIL);
    }

}
