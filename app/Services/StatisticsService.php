<?php

namespace App\Services;
use App\Repositories\StatisticsRepository;

class StatisticsService
{

    public function __construct(
        private StatisticsRepository $statisticsRepository
    ){}

    public function getStatistics(){
        return $this->statisticsRepository->getStatistics();
    }
}
