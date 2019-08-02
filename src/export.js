/**
 * helper for excel and CSV exports
 */
import csvWriter from 'csv-write-stream';
import xl from 'excel4node';
import { Readable } from 'stream';

const toCsv = (rows, filename, separator=",") => {
  var writer = csvWriter({separator});
  ctx.status = 200;
  ctx.set('Content-Type', 'text/csv');
  ctx.set('Content-Disposition', 'attachment; filename=' + filename + '.csv');

  const headers = rows.shift();
  for(const row of rows) {
    const rowObj = {};
    for(var j=0; j<row.length;j++) {
      rowObj[headers[j]] = row[j];
    }
    writer.write(rowObj);
  }

  return writer;
}

/**
 * creates xlsx from rows
 * @param  rows : array of arrays. Note that if the cell can be formatted by passing an objet instead of a string, e.g. {content: 'content of the string', color: 'red', bold: true}
 * @param worksheetName : name of the worksheet
 */
const toXls = async (rows, worksheetName) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(worksheetName);

  /**
   * helper function for defining style in xlsx (needs to be in function because of `wb`)
   * @param color : string "red"
   * @param bold : boolean
   * @return objec with style
   */
  const style = (color, bold) => wb.createStyle({
    font: {
      color,
      bold,
    }
  });

  // go through `rows`
  rows.map((row, i) => {
    // go through `row`
    row.map((val, j) => {
      let s = null;
      const cell = ws.cell(i+1, j+1);

      if (typeof val === 'object' && val !== null) {
        if (val.color) {
          s = style(val.color);
        }

        if (val.bold) {
          s = style('black', true);
        }

        if (val.href) {
          href = val.href;
        }
        val =  val.content;
      }

      if (typeof val ==='undefined' || isNaN(val) || val === '') {
        // format as link
        if (val.startsWith('http://') || val.startsWith('https://')) {
          cell.link(val);
        // display string
        } else {
          cell.string(val);
        }
      // display as number
      } else {
        cell.number(Number(val));
      }

      // apply style, if any
      if (s) {
        cell.style(s);
      }
    });
  });

  return await wb.writeToBuffer();
}

const toBok = (suite, title, heading) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const alphabetRef = [...alphabet];

  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it

  readable.push(`${heading}\n\n\n`)

  suite.forEach(({questions, answers})=> {
    const seriesLetter = alphabet.shift();

    questions.forEach((question, qIdx) => {
      const qAnswers = answers[question.id];
      const { label } = question;

      const correctAnswers = qAnswers.map((answer, idx) => ({answer, idx})).filter(a => a.answer.correct).map(a => alphabetRef[a.idx]).join(",")

      const qHead = `[ITEM Name='${title}${seriesLetter}${qIdx+1}' Type='MultipleChoice' Key='${correctAnswers}']\n`;
      const qTitle = `${label.trim()}\n`
      readable.push(qHead);
      readable.push(qTitle);

      const alphabetAnswers = [...alphabetRef];

      for (const answer of qAnswers) {
        const answerLetter = alphabetAnswers.shift();
        const { label } = answer;

        const qAnswer = `${answerLetter}. ${label.trim()}\n`;
        readable.push(qAnswer);
      }

      readable.push('\n');
    });
  });

  readable.push(null);
  return readable;
};

export default { toCsv, toXls, toBok };

/*
  toXls: function(res, rows, filename, groupHides) {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet(filename);

    const style = (color, bold) => wb.createStyle({
      font: {
        color,
        bold,
      }
    });

    wb.write(filename + '.xlsx', res);

    for(var i=0; i<rows.length;i++) {
      var row = rows[i];

      for(var j=0; j<row.length;j++) {
        let val = row[j];
        let s = null;
        let href = null;

        if (typeof val === 'object' && val !== null) {
          if (val.color) {
            s = style(val.color);
          }

          if (val.bold) {
            s = style('black', true);
          }

          if (val.href) {
            href = val.href;
          }
          val =  val.content;
          
        }

        const cell = ws.cell(i+1, j+1);

        if (href) {
          cell.link(href, val);
        } else {

          if (isNaN(parseFloat(val)) || !isFinite(val)) {
            cell.string(val);
          } else {
            cell.number(Number(val));
          }
        }

        if (s) {
          cell.style(s);
        }

        // ws.cell(1, 1).string('My simple string');
        // ws.cell(1, 2).number(5);
        // ws.cell(1, 3).formula('B1 * 10');
        // ws.cell(1, 4).date(new Date());
        // ws.cell(1, 5).link('http://iamnater.com');
        // ws.cell(1, 6).bool(true);
      }
    }

    // will create a group and hide it
    const groupHideColumns = (start, end) => {
      for(i = start; i <= end; i++){
        ws.column(i).group(1, true)
      } 
    }

    if (typeof groupHides !== 'undefined' && Array.isArray(groupHides)) {
      // go thrugh all the hide groups
      groupHides.map(x => {
        groupHideColumns(x[0], x[1]);
      });
    }
  }
*/
