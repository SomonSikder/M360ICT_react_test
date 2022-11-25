import React, { useEffect, useState } from "react";
import { differenceInDays, formatISO, parseISO } from "date-fns";
import SearchByRoketName from "./SearchByRoketName";
import Filter from "./Filter";
import Card from "../../utils/Card";

const Header = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const user = async () => {
      const res = await fetch("https://api.spacexdata.com/v3/launches");
      const data = await res.json();
      setData(data);
      setSearchData(data);
    };
    user();
  }, []);
  const handleSearch = (roketName: string) => {
    const res = data.filter((item: any) => {
      return (
        item.rocket.rocket_name.toLocaleLowerCase() ===
        roketName.toLocaleLowerCase()
      );
    });
    setSearchData(res);
    console.log(res);
  };

  // Handle Filter
  const handleFilter = (status: string) => {
    switch (status) {
      case "lastWeek":
        const lastWeekData = data.filter((item: { launch_year: string }) => {
          const dif = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year)
          );
          if (dif === 7) {
            return dif;
          }
        });

        setSearchData(lastWeekData);
        break;
      case "lastMonth":
        const lastMonthData = data.filter((item: { launch_year: string }) => {
          const dis = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year)
          );
          if (dis === 30) {
            return dis;
          }
        });
        setSearchData(lastMonthData);
        break;
      case "lastYear":
        const lastYearData = data.filter((item: { launch_year: string }) => {
          const dis = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year)
          );
          if (dis === 365) {
            return dis;
          }
        });
        setSearchData(lastYearData);
        break;
      case "success":
        const successData = data.filter((item: { launch_success: boolean }) => {
          return item.launch_success;
        });
        setSearchData(successData);
        break;
      case "fail":
        const failData = data.filter((item: { launch_success: boolean }) => {
          return !item.launch_success;
        });
        setSearchData(failData);
        break;
      case "upcoming":
        const upcoming = data.filter((item: { upcoming: boolean }) => {
          return item.upcoming;
        });
        setSearchData(upcoming);
        break;
      default:
        setSearchData(data);
    }
  };
  return (
    <div>
      <div className="d-flex flex-collumn justify-content-center align-items-center bg-dark">
        <div className="mb-5 mt-3">
          <h1 className="f1 text-white mb-5">SpaceX</h1>
          <SearchByRoketName handleSearch={handleSearch}></SearchByRoketName>
          <Filter handleFilter={handleFilter}></Filter>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ">
          {!data.length ? (
            <h1>Loading...</h1>
          ) : !searchData.length ? (
            <h1 className="my-5">No Data Found</h1>
          ) : (
            searchData.map(
              (
                item: {
                  mission_name: string;
                  links: string;
                  details: string;
                  launch_year: string;
                  launch_success: string;
                  rocket: string;
                  launch_date_unix: string;
                },
                index
              ) => <Card item={item} key={item.launch_date_unix + index}></Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
