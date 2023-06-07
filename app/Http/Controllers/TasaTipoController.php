<?php

namespace App\Http\Controllers;

use App\Models\TasaTipo;
use Illuminate\Http\Request;

class TasaTipoController extends Controller
{

    public function __invoke()
    {
        return TasaTipo::all();
    }
}
