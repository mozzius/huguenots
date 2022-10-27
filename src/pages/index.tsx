import type { InferGetStaticPropsType, NextPage } from "next";
import React, { useMemo, useReducer, useState } from "react";

import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import { Footer } from "../components/Footer";
import type { Options } from "../components/Filter";
import classes from "./index.module.css";

// find the intersection of two arrays
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

const ASSET_CLASSES = [
  "All Cap",
  "Large Cap",
  "Small Cap",
  "Governmental",
  "Currency",
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
  // use a reducer rather than useState to so that I can customise the
  // second argument. I'm not using it like a Redux reducer, it just toggles
  // whether the array has the value or not.
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
  // This is a bit of a naive implementation, but it works for this example
  // A lot of the categories overlap (i.e. Developed and Europe)
  // but this is not taken into account here.
  // In a real app the underlying data is a lot more complex, but since I only
  // have the displayed data from the XD, I'm just filtering what I can see.
  // Therefore some categories are ignored. Sorry!
  // TODO: use a real API, refetch data, and filter on the server
  const display = useMemo(() => {
    let filtered = data;
    // filter via search
    if (search) {
      filtered = data.filter((item) =>
        item.fund_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // if strategy is selected, filter by strategy
    const hasStrategy = intersection(filters, STRATEGIES).length > 0;
    if (hasStrategy) {
      filtered = filtered.filter((item) => filters.includes(item.strategy));
    }

    // none of these match the options, but filter anyway
    const hasAssetClass = intersection(filters, ASSET_CLASSES).length > 0;
    if (hasAssetClass) {
      filtered = filtered.filter((item) => filters.includes(item.asset_class));
    }

    // if a region is selected, filter by region
    // TODO: subcategories logic (should probably select all the children when the parent is selected)
    const hasRegion = intersection(filters, REGIONS).length > 0;
    if (hasRegion) {
      filtered = filtered.filter((item) => filters.includes(item.region));
    }

    // if one and only one style is selected then filter by that style
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

export const getStaticProps = async () => {
  // get from API in real app
  // you'd probably also want to use Incremental Static Regeneration
  // since the data changes every night
  const { default: data } = await import("../data.json");
  return {
    props: {
      data,
    },
  };
};
