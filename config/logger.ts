import winston from "winston";
import config from "config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = config.get<string>("env") || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} - ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  // podemos fazer com que sejam criados ficheiros separados para cada level
  //   new winston.transports.File({
  //     filename: "logs/warn.log",
  //     level: "warn",
  //   }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

const Looger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

//Quando o nível de log é definido como "debug", significa que o logger irá capturar e registrar todas as mensagens de log nos níveis debug, http, info, warn e error, pois o Winston registra todas as mensagens de nível igual ou superior ao configurado.
// Comportamento quando level é "debug": Como "debug" é o nível mais baixo (com valor 4), o logger vai capturar tudo o que for logado, desde mensagens debug até erros (error). Isso é útil em ambientes de desenvolvimento, onde você quer capturar o máximo de informações possível para identificar problemas, incluindo logs de desenvolvimento e depuração.

export default Looger;
