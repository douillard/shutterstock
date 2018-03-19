FROM centos:centos7

MAINTAINER The CentOS Project <cloud-ops@centos.org>
LABEL Vendor="CentOS"
LABEL License=GPLv2
LABEL Version=5.5.41

LABEL Build docker build --rm --tag centos/mariadb55 .

RUN yum -y install --setopt=tsflags=nodocs epel-release && \ 
    yum -y install --setopt=tsflags=nodocs mariadb-server bind-utils pwgen psmisc hostname && \ 
    yum -y erase vim-minimal && \
    yum -y update && yum clean all


COPY ./.docker/mariadb/mariadb-my.cnf /etc/mysql/my.cnf

COPY ./.docker/mariadb/scripts/ ./
RUN chmod +rx /*.sh

# Fix permissions to allow for running on openshift
RUN ./fix-permissions.sh /var/lib/mysql/   && \
    ./fix-permissions.sh /var/log/mariadb/ && \
    ./fix-permissions.sh /var/run/

RUN ./init_db.sh

ENTRYPOINT ["/run_db.sh"]
 
# By default will run as random user on openshift and the mysql user (27)
# everywhere else
USER 27

EXPOSE 3306
