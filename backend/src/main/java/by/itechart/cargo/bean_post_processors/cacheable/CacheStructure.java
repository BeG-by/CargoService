package by.itechart.cargo.bean_post_processors.cacheable;

public class CacheStructure {
    private final String name;
    private final Class<Object> keyClass;
    private final Class<Object> valueClass;

    public CacheStructure(String name, Class<Object> keyClass, Class<Object> valueClass) {
        this.name = name;
        this.keyClass = keyClass;
        this.valueClass = valueClass;
    }

    public String getName() {
        return name;
    }

    public Class<Object> getKeyClass() {
        return keyClass;
    }

    public Class<Object> getValueClass() {
        return valueClass;
    }
}
