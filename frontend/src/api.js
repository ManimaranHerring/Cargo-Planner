// frontend/src/api.js
const API_BASE_URL = 'http://localhost:4000/api';

export async function getCargoes() {
  const res = await fetch(`${API_BASE_URL}/cargoes`);
  if (!res.ok) {
    throw new Error('Failed to fetch cargoes');
  }
  return res.json();
}

export async function createCargo(cargo) {
  const res = await fetch(`${API_BASE_URL}/cargoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cargo)
  });
  if (!res.ok) {
    throw new Error('Failed to create cargo');
  }
  return res.json();
}
