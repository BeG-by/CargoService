package by.itechart.cargo.bean_post_processors.cacheable;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface CacheableMethod {
    int ttl();

    int amountHeapEntries();
}
