#!/bin/bash

set -e
set -x

mysql_install_db

# Start the MySQL daemon in the background.
mysqld_safe &
mysql_pid=$!

until usr/bin/mysqladmin ping >/dev/null 2>&1; do
  echo -n "."; sleep 0.2
done

mysql -e "DELETE FROM mysql.user;"
mysql -e "CREATE USER 'root'@'%' IDENTIFIED BY 'password';"
mysql -e "GRANT ALL ON *.* TO 'root'@'%' WITH GRANT OPTION;"
mysql -e "DROP DATABASE IF EXISTS test;"

# Permit root login without password from outside container.
#mysql -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY '' WITH GRANT OPTION"

# create the default database from the Added file.
mysql < /database.sql

# Tell the MySQL daemon to shutdown.
mysqladmin shutdown

# Wait for the MySQL daemon to exit.
wait $mysql_pid

# create a tar file with the database as it currently exists
tar czvf default_mysql.tar.gz /var/lib/mysql

# the tarfile contains the initialized state of the database.
# when the container is started, if the database is empty (/var/lib/mysql)
# then it is unpacked from default_mysql.tar.gz from
# the ENTRYPOINT /tmp/run_db script
