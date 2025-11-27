// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import { getCargoes, createCargo } from './api';

function App() {
  const [cargoes, setCargoes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCargoes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCargoes();
      setCargoes(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load cargoes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCargoes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createCargo({
        name: form.name,
        length: Number(form.length),
        width: Number(form.width),
        height: Number(form.height),
        weight: Number(form.weight)
      });

      setForm({
        name: '',
        length: '',
        width: '',
        height: '',
        weight: ''
      });

      await loadCargoes();
    } catch (err) {
      console.error(err);
      setError('Failed to create cargo');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1>Cargo Planner – Cargo Management (MVP)</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section style={{ marginBottom: '2rem' }}>
        <h2>Add Cargo</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'grid', gap: '0.5rem', maxWidth: 400 }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="length"
            placeholder="Length"
            type="number"
            value={form.length}
            onChange={handleChange}
            required
          />
          <input
            name="width"
            placeholder="Width"
            type="number"
            value={form.width}
            onChange={handleChange}
            required
          />
          <input
            name="height"
            placeholder="Height"
            type="number"
            value={form.height}
            onChange={handleChange}
            required
          />
          <input
            name="weight"
            placeholder="Weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            required
          />
          <button type="submit">Save Cargo</button>
        </form>
      </section>

      <section>
        <h2>All Cargoes</h2>
        {loading ? (
          <p>Loading…</p>
        ) : cargoes.length === 0 ? (
          <p>No cargoes yet. Add one above.</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>L</th>
                <th>W</th>
                <th>H</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {cargoes.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.length}</td>
                  <td>{c.width}</td>
                  <td>{c.height}</td>
                  <td>{c.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
