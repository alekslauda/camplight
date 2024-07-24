FROM python:3.10

WORKDIR /code

COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /code/
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["/usr/local/bin/wait-for-it.sh", "db:3306", "--"]
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:2222"]
