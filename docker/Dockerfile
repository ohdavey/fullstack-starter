FROM dunglas/frankenphp:latest

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y zsh && chsh -s /bin/zsh

RUN mkdir -p /root/zsh_data && \
    printf 'export HISTFILE=/root/zsh_data/.zsh_history\nexport HISTSIZE=10000\nexport SAVEHIST=10000\nsetopt SHARE_HISTORY\nsetopt HIST_IGNORE_DUPS\n' > /root/.zshrc

RUN install-php-extensions \
    pdo_mysql \
    redis \
    pcntl \
    opcache \
    xdebug

COPY docker/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

COPY docker/Caddyfile /etc/caddy/Caddyfile

EXPOSE 8000

CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]