package com.eventflow.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisLockService {

    private final RedissonClient redissonClient;
    private final StringRedisTemplate stringRedisTemplate;

    private static final String ATOMIC_DECREMENT_LUA = 
        "local stockKey = KEYS[1]\n" +
        "local qty = tonumber(ARGV[1])\n" +
        "local currentStock = tonumber(redis.call('get', stockKey) or '-1')\n" +
        "if currentStock < 0 then\n" +
        "    return -2\n" +
        "end\n" +
        "if currentStock < qty then\n" +
        "    return -1\n" +
        "end\n" +
        "local newStock = redis.call('decrby', stockKey, qty)\n" +
        "return newStock";

    public boolean executeWithLock(String lockKey, long waitTimeMs, long leaseTimeMs, Runnable task) {
        if (redissonClient == null) {
            task.run();
            return true;
        }

        try {
            RLock lock = redissonClient.getLock(lockKey);
            boolean acquired = lock.tryLock(waitTimeMs, leaseTimeMs, TimeUnit.MILLISECONDS);
            if (acquired) {
                try {
                    task.run();
                    return true;
                } finally {
                    if (lock.isHeldByCurrentThread()) {
                        lock.unlock();
                    }
                }
            } else {
                return false;
            }
        } catch (Exception e) {
            log.warn("Redis lock error ({}), falling back to direct DB execution.", e.getMessage());
            task.run();
            return true;
        }
    }

    public Long tryAtomicStockDecrement(String stockKey, int quantity) {
        if (stringRedisTemplate == null) {
            return -2L;
        }
        try {
            DefaultRedisScript<Long> script = new DefaultRedisScript<>();
            script.setScriptText(ATOMIC_DECREMENT_LUA);
            script.setResultType(Long.class);

            return stringRedisTemplate.execute(script, Collections.singletonList(stockKey), String.valueOf(quantity));
        } catch (Exception e) {
            return -2L;
        }
    }

    public void setStockInRedis(String stockKey, int stock) {
        if (stringRedisTemplate == null) return;
        try {
            stringRedisTemplate.opsForValue().set(stockKey, String.valueOf(stock));
        } catch (Exception e) {
            log.debug("Redis setStock skipped");
        }
    }

    public Integer getStockFromRedis(String stockKey) {
        if (stringRedisTemplate == null) return null;
        try {
            String val = stringRedisTemplate.opsForValue().get(stockKey);
            return val != null ? Integer.parseInt(val) : null;
        } catch (Exception e) {
            return null;
        }
    }
}
