CREATE TABLE to_do_list (
    id SERIAL PRIMARY KEY,
    task VARCHAR(80),
    status VARCHAR(20),
	due_date VARCHAR(20)
);

SELECT * FROM to_do_list;

