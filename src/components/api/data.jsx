import toast from "react-hot-toast";

export async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address_street: user.address.street,
      address_suite: user.address.suite,
      address_city: user.address.city,
      address_zipcode: user.address.zipcode,
      address_geo_lat: user.address.geo.lat,
      address_geo_lng: user.address.geo.lng,
      phone: user.phone,
      website: user.website,
      company_name: user.company.name,
      company_catchPhrase: user.company.catchPhrase,
      company_bs: user.company.bs,
    }));
  } catch (err) {
    toast.error("Failed to fetch users!");
    return [];
  }
}

export async function fetchTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    toast.error("Failed to fetch todos!");
    return [];
  }
}
