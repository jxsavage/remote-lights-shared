import chalk from 'chalk';

const chalkColors = new chalk.Instance({ level: 3 });
const info = chalkColors.black.bgBlue;
const infoHeader = chalkColors.black.bgCyan;
const textGreen = chalkColors.green;
const bgGreen = chalkColors.black.bgGreen;
const textRed = chalkColors.red;
const bgRed = chalkColors.black.bgRed;
const textYellow = chalkColors.yellow;
const bgYellow = chalkColors.black.bgYellow;

const colors = {
  info,
  infoHeader,
  textGreen,
  bgGreen,
  textRed,
  bgRed,
  textYellow,
  bgYellow
}
type Colors = typeof colors;

const log = (color: keyof Colors, message: string): void => {
  console.log(colors[color](` ${message} `));
};

export default log;