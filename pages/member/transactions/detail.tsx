import React from 'react';
import SideBar from '../../../components/organisms/SideBar';

export default function TransacationDetailProps() {
  return (
    <section className="transactions-detail overflow-auto">
        <SideBar activeMenu="transactions" />
        <TransacationDetailProps />
    </section>
  );
}
