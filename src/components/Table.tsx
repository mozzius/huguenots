import classes from "./table.module.css";

interface Props {
  data: {
    fund_name: string;
    primary_ticker: string;
    income_treatment: string;
    share_class_currency: string;
    isin: string;
    strategy: string;
    asset_class: string;
    region: string;
    style: string;
  }[];
}

export const Table = ({ data }: Props) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Fund Name</th>
          <th>Primary Ticker</th>
          <th>Income Treatment</th>
          <th>Share Class Currency</th>
          <th>ISIN</th>
          <th>Strategy</th>
          <th>Asset Class</th>
          <th>Region</th>
          <th>Style</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.isin}>
            <td>{item.fund_name}</td>
            <td>{item.primary_ticker}</td>
            <td>{item.income_treatment}</td>
            <td>{item.share_class_currency}</td>
            <td>{item.isin}</td>
            <td>{item.strategy}</td>
            <td>{item.asset_class}</td>
            <td>{item.region}</td>
            <td>{item.style}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
