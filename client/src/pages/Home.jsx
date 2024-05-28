import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [bookListings, setBookListings] = useState([]);
  const [electronicsListings, setElectronicsListings] = useState([]);
  const [furnitureListings, setFurnitureListings] = useState([]);
  const [bookOfferListings, setBookOfferListings] = useState([]);
  const [electronicsOfferListings, setElectronicsOfferListings] = useState([]);
  const [furnitureOfferListings, setFurnitureOfferListings] = useState([]);
  
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for books
        const bookRes = await fetch('/api/listing/get?category=books&limit=4');
        const bookData = await bookRes.json();
        console.log("Book Data:", bookData);

        setBookListings(bookData);

        // Fetch data for electronics
        const electronicsRes = await fetch('/api/listing/get?category=electronics&limit=4');
        const electronicsData = await electronicsRes.json();
        console.log("Electronics Data:", electronicsData);

        setElectronicsListings(electronicsData);

        // Fetch data for furniture
        const furnitureRes = await fetch('/api/listing/get?category=furniture&limit=4');
        const furnitureData = await furnitureRes.json();
        setFurnitureListings(furnitureData);

        // Fetch offer listings for books
        const bookOfferRes = await fetch('/api/listing/get?category=books&offer=true&limit=4');
        const bookOfferData = await bookOfferRes.json();
        setBookOfferListings(bookOfferData);

        // Fetch offer listings for electronics
        const electronicsOfferRes = await fetch('/api/listing/get?category=electronics&offer=true&limit=4');
        const electronicsOfferData = await electronicsOfferRes.json();
        setElectronicsOfferListings(electronicsOfferData);

        // Fetch offer listings for furniture
        const furnitureOfferRes = await fetch('/api/listing/get?category=furniture&offer=true&limit=4');
        const furnitureOfferData = await furnitureOfferRes.json();
        setFurnitureOfferListings(furnitureOfferData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>

      {/* Offer Listings for Books */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {bookOfferListings && bookOfferListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Offers for Books
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?offer=true&type=book'}
              >
                See more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {bookOfferListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings for Books */}
        {bookListings && bookListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Books for Sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?'}
              >
                See more books
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {bookListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      

      {/* Offer Listings for Electronics */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {electronicsOfferListings && electronicsOfferListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Offers for Electronics
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?offer=true&type=electronics'}
              >
                See more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {electronicsOfferListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings for Electronics */}
        {electronicsListings && electronicsListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Electronics for Sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=electronics'}
              >
                See more electronics
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {electronicsListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      

      {/* Offer Listings for Furniture */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {furnitureOfferListings && furnitureOfferListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Offers for Furniture
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?offer=true&type=furniture'}
              >
                See more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {furnitureOfferListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings for Furniture */}
        {furnitureListings && furnitureListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Furniture for Sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=sale'}
              >
                See more furniture
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {furnitureListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
