import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    condition: 'all',
    offer: false,
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const conditionFromUrl = urlParams.get('condition');
    const offerFromUrl = urlParams.get('offer');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      conditionFromUrl ||
      offerFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        condition: conditionFromUrl || 'all',
        offer: offerFromUrl === 'true',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setSidebardata({
        ...sidebardata,
        [name]: checked,
      });
    } else if (type === 'radio') {
      setSidebardata({
        ...sidebardata,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('condition', sidebardata.condition);
    urlParams.set('offer', sidebardata.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              name='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='all'
                name='type'
                value='all'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>All</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='electronics'
                name='type'
                value='electronics'
                onChange={handleChange}
                checked={sidebardata.type === 'electronics'}
              />
              <span>Electronics</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='books'
                name='type'
                value='books'
                onChange={handleChange}
                checked={sidebardata.type === 'books'}
              />
              <span>Books</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='furniture'
                name='type'
                value='furniture'
                onChange={handleChange}
                checked={sidebardata.type === 'furniture'}
              />
              <span>Furniture</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Condition:</label>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='all'
                name='condition'
                value='all'
                onChange={handleChange}
                checked={sidebardata.condition === 'all'}
              />
              <span>All</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='new'
                name='condition'
                value='new'
                onChange={handleChange}
                checked={sidebardata.condition === 'new'}
              />
              <span>New</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='used'
                name='condition'
                value='used'
                onChange={handleChange}
                checked={sidebardata.condition === 'used'}
              />
              <span>Used</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              name='offer'
              onChange={handleChange}
              checked={sidebardata.offer}
            />
            <label htmlFor='offer'>Offer</label>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}