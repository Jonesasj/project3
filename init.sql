DROP TABLE email_log;
DROP TABLE email_event_log;

CREATE TABLE email_log(
    id int PRIMARY KEY,
    message_id      char(36)        NOT NULL UNIQUE,
    customer_id     int             DEFAULT NULL,
    email_to        varchar(255),    
    subject         varchar(255)    DEFAULT NULL,
    has_attachment  int             DEFAULT 0,
    sent_ts         TEXT,
    latest_event    varchar(255),    
    latest_event_ts TEXT
);

CREATE TABLE email_event_log(
    id              int             PRIMARY key,
    message_id      char(36),
    event_id        varchar(64)     UNIQUE,
    event           varchar(255),
    event_ts        TEXT,
    FOREIGN KEY(message_id) REFERENCES email_log(message_id)
);


--Test Data

INSERT INTO email_log (id, message_id, customer_id, email_to, subject, has_attachment, latest_event, latest_event_ts)
VALUES (1, '1', 1, 'alexsjones@protonmail.com', 'test', 0, 'Delivered', '2019-02-02 12:00:00');

INSERT INTO email_event_log(id, message_id, event_id, event, event_ts)
VALUES (1, '1', '1', 'delivered', '2019-02-02 12:00:00');

INSERT INTO email_event_log(id, message_id, event_id, event, event_ts)
VALUES (2, '1', '2', 'delivered', '2019-02-02 12:00:00');

INSERT INTO email_event_log(id, message_id, event_id, event, event_ts)
VALUES (3, '1', '3', 'delivered', '2019-02-02 12:00:00');