--Creating function

CREATE OR REPLACE FUNCTION upd_timestamp() RETURNS TRIGGER 
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


--Creating Table USER

CREATE TABLE "user"(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR NOT null,
   email VARCHAR NOT null,
   password VARCHAR NOT null,
   created_at timestamp default current_timestamp,
   updated_at timestamp default current_timestamp
);



CREATE TRIGGER t_name
  BEFORE UPDATE
  ON "user"
  FOR EACH ROW
  EXECUTE PROCEDURE upd_timestamp();
 

 
 --Creating Table MESSAGES
 
 CREATE TABLE messages (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	sender_id uuid NOT NULL,
	receiver_id uuid NOT NULL,
	message varchar NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT messages_pkey PRIMARY KEY (id)
);

CREATE TRIGGER t_name
  BEFORE UPDATE
  ON "messages"
  FOR EACH ROW
  EXECUTE PROCEDURE upd_timestamp();
  
 
 
 
 
 
 
 