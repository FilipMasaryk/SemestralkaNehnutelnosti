import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import NehnutelnostImage from './NehnutelnostImageData.ts';
import NehnutelnostData from './NehnutelnostData.ts';
import NehnutelnostCard from './NehnutelnostCard.tsx';
import { authContext } from './App.tsx';

function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [NehnutelnostImageList, setNehnutelnostImageList] = useState<NehnutelnostImage[]>([]);
    const [NehnutelnostDataList, setNehnutelnostDataList] = useState<NehnutelnostData[]>([]);
    const [searchBarValue, setSearchBarValue] = useState<string>('');
    const auth = useContext(authContext);

    console.log(auth)

    const getImageNames = (id: number): string[] => {
        const filteredImages = NehnutelnostImageList
            .filter(image => image.property_id === id)
            .map(image => image.name);
        return filteredImages;
    }



    const handleSearchBarButtonClick = () => {
        if (searchBarValue !== '') {
            fetch(`http://localhost:5174/api/properties/search/${searchBarValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(data => {
                    //console.log(data)
                    setNehnutelnostDataList(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            fetch('http://localhost:5174/api/properties/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setNehnutelnostDataList(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }


    //console.log(getStringArray(4));
    useEffect(() => {
        //console.log("AAA");
        fetch(`http://localhost:5174/api/photos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setNehnutelnostImageList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [NehnutelnostDataList]);

    useEffect(() => {
        fetch('http://localhost:5174/api/properties/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setNehnutelnostDataList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //console.log(NehnutelnostDataList);
    return (
        <>
            <div className="container" style={{ maxWidth: '100%' }}>
                <img src="/images/house2.jpg" alt="House" className="responsiveImage" />
                <div className="centered">
                    <div className="search">
                        <input type="textImage" placeholder="Search.." className="searchTerm" onChange={(e) => setSearchBarValue(e.target.value)} />
                        <button type="submit" className="searchButton" onClick={handleSearchBarButtonClick}><i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="containerCard">
                {NehnutelnostDataList.length > 0 ? (
                    NehnutelnostDataList.map((NehnutelnostData) => (
                        <NehnutelnostCard data={NehnutelnostData} images={getImageNames(NehnutelnostData.id)} />
                    ))
                ) : (
                    <h1>No properties found</h1>
                )}
            </div>
        </>
    );
}

export default MainPage;