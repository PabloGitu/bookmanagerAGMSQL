package com.tfg.bookmanageragmsql.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.tfg.bookmanageragmsql.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Author.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Author.class.getName() + ".books", jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Book.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Book.class.getName() + ".comments", jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Comment.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Publisher.class.getName(), jcacheConfiguration);
            cm.createCache(com.tfg.bookmanageragmsql.domain.Publisher.class.getName() + ".books", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
