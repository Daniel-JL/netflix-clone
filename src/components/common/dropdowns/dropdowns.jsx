/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { RectDropdownButton } from '../buttons/buttons';
import { AccountDropdownMenu, EpisodeDropdownMenu } from '../dropdown-menus/dropdown-menus';

export function AccountDropdown() {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div>
      <nav>
        <RectDropdownButton
          onMouseOver={() => setDropdownActive((dropdownActive) => !dropdownActive)}
          onMouseOut={() => setDropdownActive((dropdownActive) => !dropdownActive)}
        />
        {dropdownActive && <AccountDropdownMenu />}

      </nav>
    </div>
  );
}

export function EpisodeDropdown({
  selectedSeason,
  numEpsPerSeason,
  changeSelectedSeason,
}) {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [numOfSeasons, setNumOfSeasons] = useState();
  const [displaySeason, setDisplaySeason] = useState('Season 1');
  const [epsPerSeason, setEpsPerSeason] = useState([]);
  const ref = useRef();
  useOnClickOutside(ref, () => handleClickOutside());

  const handleClickOutside = () => {
    if (dropdownActive) {
      setDropdownActive((dropdownActive) => !dropdownActive);
    }
  };

  const handleSeasonEpisodeData = () => {
    setNumOfSeasons((numOfSeasons) => numEpsPerSeason.length);
  };

  useEffect(() => {
    handleSeasonEpisodeData();
  }, []);

  return (
    <div ref={ref}>
      <nav>
        <RectDropdownButton
          onClick={() => setDropdownActive((dropdownActive) => !dropdownActive)}
        >
          {`Season ${selectedSeason}`}
        </RectDropdownButton>
        {dropdownActive
        && (
          <EpisodeDropdownMenu
            numOfSeasons={numOfSeasons}
            numEpsPerSeason={numEpsPerSeason}
            changeSelectedSeason={changeSelectedSeason}
            closeDropdown={() => setDropdownActive((dropdownActive) => !dropdownActive)}
          />
        )}

      </nav>
    </div>
  );
}
