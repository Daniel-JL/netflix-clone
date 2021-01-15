/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect, useRef } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { RectInfoButton } from './buttons';
import { AccountDropdownMenu, EpisodeDropdownMenu } from './dropdown-menus';

export function AccountDropdown() {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div>
      <nav>
        <RectInfoButton
          onMouseOver={() => setDropdownActive((dropdownActive) => !dropdownActive)}
          onMouseOut={() => setDropdownActive((dropdownActive) => !dropdownActive)}
        />
        {dropdownActive && <AccountDropdownMenu />}

      </nav>
    </div>
  );
}

export function EpisodeDropdown(props) {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [numOfSeasons, setNumOfSeasons] = useState();
  const [epsPerSeason, setEpsPerSeason] = useState([]);
  const ref = useRef();
  useOnClickOutside(ref, () => handleClickOutside());

  const handleClickOutside = () => {
    if (dropdownActive) {
      setDropdownActive((dropdownActive) => !dropdownActive);
    }
  };

  const handleSeasonEpisodeData = () => {
    setNumOfSeasons((numOfSeasons) => props.seasonEpisodeData.length);
    // for (let i = 0; i < props.seasonEpisodeData.length; i++) {
    //   setEpsPerSeason((epsPerSeason) => [...epsPerSeason, props.seasonEpisodeData[i].length]);
    // }
  };

  useEffect(() => {
    handleSeasonEpisodeData();
  }, []);

  useEffect(() => {
    console.log(numOfSeasons);
    console.log(epsPerSeason);
  });

  return (
    <div ref={ref}>
      <nav>
        <RectInfoButton
          
          onClick={() => setDropdownActive((dropdownActive) => !dropdownActive)}
        />
        {dropdownActive
        && (
          <EpisodeDropdownMenu
            numOfSeasons={numOfSeasons}
            seasonEpisodeData={props.seasonEpisodeData}
            changeSelectedSeason={props.changeSelectedSeason}
          />
        )}

      </nav>
    </div>
  );
}
