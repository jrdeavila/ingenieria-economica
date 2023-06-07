<?php

namespace Database\Seeders;

use App\Models\TasaTipo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasaTipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TasaTipo::create([
            "nombre" => "Mensual",
            "valor" => 1 / 12,
        ]);
        TasaTipo::create([
            "nombre" => "Trimestral",
            "valor" => 1 / 4,
        ]);

        TasaTipo::create([
            "nombre" => "Semestral",
            "valor" => 1 / 2,
        ]);

        TasaTipo::create([
            "nombre" => "Anual",
            "valor" => 1,
        ]);
    }
}
