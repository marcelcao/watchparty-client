import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import PartyCard from '../../components/Cards/PartyCard';
import { getAllParties } from '../../utils/data/partyData';
import PartyModal from '../../components/Modals/PartyModal';

function AllParties() {
  const [parties, setParties] = useState([]);
  const { user } = useAuth();

  const getWatchParties = () => {
    getAllParties(user.uid).then((data) => setParties(data));
  };

  const fetchParties = () => {
    getWatchParties();
  };

  useEffect(() => {
    getWatchParties();
  }, []);

  return (
    <>
      <div className="watch-parties-container">
        <div>
          <div>
            All Parties:
          </div>
          <div>
            <PartyModal fetchParties={fetchParties} />
          </div>
        </div>
        <div className="party-card-contain">
          {parties.map((party) => (
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
