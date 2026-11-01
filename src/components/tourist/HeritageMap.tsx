import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { destinations } from '../../data/destinations'
import type { CrowdLevel, CrowdReport } from '../../types/crowd'
import { timeAgo } from '../../utils/freshness'

const colors: Record<CrowdLevel, string> = {
  Low: '#1e8f7b',
  Moderate: '#b8794a',
  High: '#5b3590',
}

export default function HeritageMap({ reports }: { reports: CrowdReport[] }) {
  const points = reports.flatMap((report) => {
    const place = destinations.find((item) => item.id === report.destinationId)
    return place ? [{ report, lat: place.lat, lng: place.lng }] : []
  })

  return (
    <div>
      <div className="h-[420px] overflow-hidden rounded-lg border border-sand-200">
        <MapContainer center={[24.5854, 73.6833]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map(({ report, lat, lng }) => (
            <CircleMarker
              key={report.destinationId}
              center={[lat, lng]}
              radius={11}
              pathOptions={{ color: colors[report.level], fillColor: colors[report.level], fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>{report.name}</strong>
                <br />
                {report.level} crowd · {timeAgo(report.minutesAgo)}
                <br />
                Sample crowd report
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <p className="mt-3 text-sm text-ink-500">
        Green is low, sandstone is moderate, purple is high. Prototype data, not live detection. Map tiles need internet; the list view works offline.
      </p>
    </div>
  )
}