import React, { useEffect } from 'react'
import { PageNavigation } from '../components';
import { Link } from 'react-router-dom';

const Shipping = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <PageNavigation title1='Home' path1='/' title2={'Shipping & Delivery Policy'} />
      <div className=' container-mx font-Roboto mt-[3rem]'>

        <div className="dummy-page__section">
          <p className="dummy-page__paragraph">
            This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms:
          </p>
          <Link to='/terms' className="dummy-page__paragraph ">
            <span className='text-staticBlue font-bold'>http://www.promarket.com/terms.</span>
          </Link>
          <p className="dummy-page__paragraph">
            Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
          </p>
        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            WHAT ARE MY SHIPPING & DELIVERY OPTIONS?
          </h3>
          <p className="dummy-page__paragraph">
            We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
          </p>

        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            Shipping Fees
          </h3>
          <p className="dummy-page__paragraph">
            All times and dates given for delivery of the products are given in good faith but are estimates only.
          </p>

        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            DO YOU DELIVER INTERNATIONALLY?
          </h3>
          <p className="dummy-page__paragraph">
            We do not offer international shipping.
          </p>

        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            WHAT HAPPENS IF MY ORDER IS DELAYED?
          </h3>
          <p className="dummy-page__paragraph">
            If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
          </p>

        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            QUESTIONS ABOUT RETURNS?
          </h3>
          <p className="dummy-page__paragraph">
            If you have questions about returns, please review our Return Policy:
          </p>
          <Link to='/terms' className="dummy-page__paragraph ">
            <span className='text-staticBlue font-bold'>http://www.promarket.com/returns.</span>
          </Link>
        </div>
        <div className="dummy-page__section">
          <h3 className="dummy-page__title">
            HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </h3>
          <p className="dummy-page__paragraph">
            If you have any further questions or comments, you may contact us by:
          </p>
          <a href='mailto:support@promarket.com' className="dummy-page__paragraph"
            target='_blank'
            rel='noreferrer'>
            <span className='text-staticBlue font-bold'>Email: support@promarket.com</span>
          </a>
        </div>
      </div>
    </>
  )
}

export default Shipping
