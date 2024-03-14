import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import PartyCard from '../../components/Cards/PartyCard';
import { getAllParties } from '../../utils/data/partyData';
import PartyModal from '../../components/Modals/PartyModal';
import SearchBar from '../../components/SearchBar';

function AllParties() {
  const [parties, setParties] = useState([]);
  const [showParties, setShowParties] = useState([]);
  const { user } = useAuth();

  const getWatchParties = () => {
    getAllParties(user.uid).then((data) => setParties(data));
  };

  const fetchParties = () => {
    getWatchParties();
  };

  const filterSearchResult = (query) => {
    const filter = parties.filter((party) => party.party_name.toLowerCase().includes(query));
    setShowParties(filter);
  };

  const alphabeticalParties = showParties.sort((a, b) => a.party_name.localeCompare(b.party_name));

  useEffect(() => {
    getWatchParties();
  }, []);

  useEffect(() => {
    setShowParties(parties);
  }, [parties]);

  useEffect(() => {
    document.title = 'Parties - Watch Party';
  }, []);

  return (
    <>
      <div className="parties-container">
        <h1 id="home-header">Community Watch Parties</h1>
        <div className="search-party">
          <SearchBar onChange={(query) => filterSearchResult(query)} />
        </div>
        <PartyModal fetchParties={fetchParties} />
      </div>
      <div className="party-card-wrapper">
        <div className="party-cards-container">
          {alphabeticalParties.map((party) => (
            <section key={`party--${party.id}`} className="party">
              <PartyCard partyObj={party} onUpdate={getWatchParties} attended={party.attended} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllParties;
