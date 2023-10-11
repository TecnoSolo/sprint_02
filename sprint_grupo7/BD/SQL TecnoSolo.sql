create database tecnosolo;

use tecnosolo;

CREATE TABLE cliente (
idCliente int primary key auto_increment,
email varchar(245) UNIQUE, 
senha varchar(245) NOT NULL,
nome varchar(40), 
razaoSocial varchar(40),
cnpj char(18),
telefone char(11),
constraint chkemail check (email LIKE  ( '%@%.%')),
constraint chkcnpj check (cnpj LIKE '__.___.___/0001-__'))auto_increment = 1;

create table sensores (
idSensor int primary key auto_increment,
modelo_sensor varchar(40),
latitude decimal(10, 8) DEFAULT 00.000000,
longitude decimal(11, 8) DEFAULT 00.000000,
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente),
fkPlantacao int, constraint fkPT foreign key (fkPlantacao) references plantacaoTomate (idPlantacao));

-- tipo_sensor varchar(50));


CREATE TABLE dadosLeitura(
idLeitura int primary key auto_increment,
data_instalacao date not null,
data_hora_leitura timestamp default current_timestamp not null,
umidadeSoloTomate float not null,
fkSensor int, constraint fkS foreign key (fkSensor) references sensores (idSensor));


create table plantacaoTomate(
idPlantacao int primary key auto_increment,
hectares float default 0,
qtdAgua float default 0,
qtdSensores int default 0,
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente));
;

create table endereco(
idEndereco int primary key auto_increment,
cep char(9),
uf varchar(2),
cidade varchar(50),
bairro varchar(50),
rua varchar(50),
complemento varchar(10),
constraint chkcep check (cep LIKE '_____-___'),
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente));

insert into cliente values 
	(null, 'pomodoro@tomate.com', 'EoK01!3f', 'João Carlos Gomes', 'PomodoroCompany', '01.001.001/0001-01', '997828063'),
    (null, 'tomato@gmail.com', '!OPcD05d', 'Jonas Cardooso Alves', 'TomatoCompany', '02.002.002/0001-02', '912018173');
    
insert into endereco values 
	(null, '05889-380', 'SP', 'São Paulo', 'Parque Fernanda', 'Rua General Ribamar de Miranda', null, 1),
    (null, '19872-331', 'RJ', 'Rio de Janeiro', 'Botafogo', 'Rua Uruguaiana', null, 1),
    (null, '83312-912', 'SP', 'São Paulo', 'Jardins', 'Rua Canadá', null, 2);
    
insert into plantacaoTomate values 
	(null, 25, 2000000, 125, 1),
    (null, 20, 1800000, 120, 2),
    (null, 13, 1100000, 80, 1);

insert into sensores values
	(null, 'DHT11', '40.71727401', '-74.00898606', 1, 1),
	(null, 'DHT11', '-71.6741', '36.0204', 1, 3),
    (null, 'DHT11', '-50.2925', '29.1891', 2, 2);

insert into dadosLeitura values
	(null, '2023-10-11', current_timestamp(), 70, 1),
    (null, '2023-10-11', current_timestamp(), 80, 3),
    (null, '2023-06-08', current_timestamp(), 75, 2);




    
