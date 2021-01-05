import _ from 'lodash';

export default {
  name: 'ElStatistics',
  props: {
    value: {
      type: String | Number,
      required: true
    },
    formatter: Function,
    precision: Number,
    decimalSeparator: {
      type: String,
      default: '.'
    },
    groupSeparator: {
      type: String,
      default: ','
    },
    round: {
      type: Boolean,
      default: true
    }
  },
  render(h) {
    const { value, formatter, precision, decimalSeparator, groupSeparator = '', round, $slots } = this;
    let valueNode;

    if (typeof formatter === 'function') {
      // Customize formatter
      valueNode = formatter(value);
    } else {
      // Internal formatter
      const val = String(_.defaultTo(value, '0'));
      const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);
      // Process if illegal number
      if (!cells || val === '-') {
        valueNode = val;
      } else {
        const negative = cells[1];
        let int = cells[2] || '0';
        let decimal = cells[4] || '';

        if (typeof precision === 'number') {
          // round
          if (round && !isNaN(_.toNumber(decimal))) {
            let roundRet = _.round(_.toNumber(`0.${decimal}`), precision);
            roundRet = String(roundRet);
            decimal = roundRet.split('.')[1];
            // 进位操作
            if (roundRet === '1') {
              int = String((+int) + (+roundRet));
            }
          }
          decimal = _.padEnd(decimal, precision, '0').slice(0, precision);
        }

        if (decimal) {
          decimal = `${decimalSeparator}${decimal}`;
        }

        int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

        valueNode = [
          <span key="int" class="el-statistics-content-value-int">
            {negative}
            {int}
          </span>,
          decimal && (
            <span key="decimal" class="el-statistics-content-value-decimal">
              {decimal}
            </span>
          )
        ];
      }
    }

    return (
      <span class="el-statistics-content-value">
        { $slots.prefix ? $slots.prefix : '' }
        {valueNode}
        { $slots.suffix ? $slots.suffix : '' }
      </span>
    );
  }
};
