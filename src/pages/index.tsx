import type { InferGetStaticPropsType, NextPage } from "next";
import React, { useMemo, useReducer, useState } from "react";

import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import { Footer } from "../components/Footer";
import type { Options } from "../components/Filter";
import classes from "./index.module.css";

import data from "../data.json";

export const getStaticProps = async () => {
  // get from API in real app
  return {
    props: {
      data,
    },
  };
};

const intersection = (a: string[], b: string[]) =>
  a.filter((value) => b.includes(value));

const STRATEGIES = [
  "Thematic",
  "Factors",
  "Equity Income",
  "Capital Strength",
  "Currency Hedge",
  "ESG",
];

const NESTED_ASSET_CLASSES: Options = {
  Equity: ["All Cap", "Large Cap", "Small Cap"],
  "Fixed Income": ["Governmental", "Currency"],
};

const REGIONS = [
  "Developed",
  "Emerging",
  "Region",
  "Asia Pacific",
  "Europe",
  "Eurozone",
  "Germany",
  "Switzerland",
  "United Kingdom",
  "Global",
  "North America",
  "United States",
];

const NESTED_REGIONS: Options = {
  Market: ["Developed", "Emerging"],
  Region: [
    "Asia Pacific",
    { Europe: ["Eurozone", "Germany", "Switzerland", "United Kingdom"] },
    "Global",
    { "North America": ["United States"] },
  ],
};

const STYLES = ["Index", "Active"];

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const [search, setSearch] = useState("");
  const [filters, selectOptions] = useReducer<React.Reducer<string[], string>>(
    (state, option) => {
      if (state.includes(option)) {
        return state.filter((value) => value !== option);
      } else {
        return [...state, option];
      }
    },
    []
  );

  // use search and filters to filter data
  // I handle each case individually, since I don't really
  const display = useMemo(() => {
    let filtered = data;
    // filter via search
    if (search) {
      filtered = data.filter((item) =>
        item.fund_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // only one strategy is used in the provided, so see if any strategy is selected
    // if so, filter by Thematic
    const hasStrategy = intersection(filters, STRATEGIES).length > 0;
    if (hasStrategy) {
      filtered = filters.includes("Thematic")
        ? filtered.filter((item) => item.strategy === "Thematic")
        : [];
    }

    // I don't know how asset class relates to the data
    // so I'm just ignoring it
    // TODO: handle asset class

    // if a region is selected, filter by region
    const hasRegion = intersection(filters, REGIONS).length > 0;
    if (hasRegion) {
      filtered = filtered.filter((item) => filters.includes(item.region));
    }

    // if one and only one style is selected then filter by that style
    // TODO: subcategories logic
    const hasStyle = intersection(filters, STYLES).length === 1;
    if (hasStyle) {
      filtered = filtered.filter(
        (item) => item.style === intersection(filters, STYLES)[0]
      );
    }

    return filtered;
  }, [data, search, filters]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.productFinder}>
        <h1>Product Finder</h1>
        <div className={classes.options}>
          <Search search={search} setSearch={setSearch} />
          <div className={classes.filters}>
            <Filter
              label="Strategy"
              options={STRATEGIES}
              values={filters}
              selectOptions={selectOptions}
            />
            <Filter
              label="Asset Class"
              options={NESTED_ASSET_CLASSES}
              values={filters}
              selectOptions={selectOptions}
            />

            <Filter
              label="Market & Region"
              options={NESTED_REGIONS}
              values={filters}
              selectOptions={selectOptions}
            />
            <Filter
              label="Style"
              options={STYLES}
              values={filters}
              selectOptions={selectOptions}
            />
          </div>
        </div>
      </div>
      <main>
        <Table data={display} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
